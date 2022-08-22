<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="355" persistent>
      <v-container class="d-block">
        <v-row no-gutters align="center" justify="space-between">
          <v-row no-gutters>
            <h3>Add Board</h3>
          </v-row>
          <v-icon @click="dialog = false">mdi-close</v-icon>
        </v-row>
        <v-form ref="form" v-model="valid">
          <div class="d-flex flex-column">
            <v-text-field
              label="Board title"
              v-model="board.title"
              :rules="[(v) => !!v || 'Board title is required']"
              name="title"
              type="text"
            ></v-text-field>
            <v-btn
              depressed
              v-if="enableColor === false"
              @click="enableColor = true"
            >
              Choose board color
            </v-btn>
            <br />
            <v-color-picker
              v-if="enableColor === true"
              v-model="board.color"
              dot-size="25"
              hide-inputs
              swatches-max-height="100"
            ></v-color-picker>
            <div
              class="d-flex flex-column align-center justify-center flex-grow-1 upload-block"
              @click="choseImage"
              :style="`background-image: url('${
                board.image.downloadURL ? board.image.downloadURL : ''
              }');height:150px;background-size: cover;background-position: center;`"
            >
              <template
                v-if="!fileToUpload.progress || fileToUpload.progress == 0"
              >
                <v-icon>mdi-camera</v-icon>
                <p>Add a board background</p>
                <input
                  type="file"
                  accept="jpg, jpeg, png"
                  ref="boardBackground"
                  multiple
                  color="#f66f26"
                  buffer-value="0"
                  @click="onFileClicked($event)"
                  @change="onFileSelected($event)"
                  style="display: none"
                />
              </template>
              <template
                v-else-if="
                  fileToUpload.progress > 0 && fileToUpload.progress < 100
                "
              >
                <div class="text-center">
                  <v-progress-circular
                    :size="50"
                    color="green"
                    indeterminate
                  ></v-progress-circular>
                </div>
              </template>
            </div>
            <v-btn color="primary" :disabled="!valid" @click="createBoard"
              >Submit</v-btn
            >
          </div>
        </v-form>
      </v-container>
    </v-dialog>
    <div class="d-flex flex-row align-center justify-space-between">
      <h1>My Boards</h1>
      <v-btn small depressed @click="addBoard">ADD BOARD</v-btn>
    </div>
     <div class="d-flex flex-wrap align-center justify-start">
      <p v-if="boards.length === 0">You have no boards yet.</p>
      <v-card
        :style="board.image.downloadURL != '' ? `background:url(${board.image.downloadURL});`: board.color ? `background-color:${board.color}` : ''"
        @click="$router.push('/boards/' + board.id)"
        class="jello-board-tile"
        v-for="board in boards"
        v-bind:key="board.id"
      >
        <v-card-title :style="board.image.downloadURL != '' ? 'color:#fff':''">
          {{ board.title }}
        </v-card-title>
        <v-card-subtitle :style="board.image.downloadURL != '' ? 'color:#fff':''">
          created {{ board.dateCreated | formatDate }}
        </v-card-subtitle>
      </v-card>
    </div>
    <v-snackbar
      :timeout="3000"
      v-model="snackbar"
      absolute
      bottom
      color="primary"
    >
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'IndexPage',

  data() {
    return {
      dialog: false,
      enableColor: false,
      valid: false,
      board: {
        title: '',
        color: '',
        image: {
          name: '',
          originalName: '',
          downloadURL: '',
          uuid: '',
        },
      },
      snackbar: false,
      snackbarText: 'No error message',
      currentBoardId: '',
      fileToUpload: {},
    }
  },
  async asyncData(){
      let boardRefs = window.$nuxt.$fire.firestore.collection('users').doc(window.$nuxt.$fire.auth.currentUser.uid).collection('boards')
      let boardData = []
      await boardRefs.get().then((querySnapShot) => {
        if(querySnapShot.docs.length > 0){
          try {
            for(let doc of querySnapShot.docs){
              let data = doc.data()
              data.id = doc.id
              boardData.push(data)
            }
          } catch (error) {
            console.log(error)
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
      return {
        boards: boardData
      }
    },
  methods: {
    addBoard() {
      this.dialog = true
      this.currentBoardId = uuidv4()
    },
    choseImage() {
      this.$refs.boardBackground.click()
    },
    onFileClicked(e) {
      e.target.value = ''
    },
    onFileSelected(e) {
      let file = e.target.files[0]
      try {
        this.fileToUpload = {
          file,
          originalName: file.name,
          loading: false,
          progress: 0,
          success: false,
          error: false,
          previewPath: '',
          uuid: uuidv4(),
        }
        this.uploadFile()
      } catch (error) {}
    },
    uploadFile() {
      const itemFilename =
        this.fileToUpload.uuid + '-' + this.fileToUpload.originalName

      const itemName =
        'images' +
        '/' +
        this.$fire.auth.currentUser.uid +
        '/' +
        'boards' +
        '/' +
        this.currentBoardId +
        '/' +
        itemFilename

      const itemRef = this.$fire.storage.ref().child(itemName)
      const itemMeta = {
        customMetaData: {
          owner: this.$fire.auth.currentUser.uid,
        },
      }
      const uploadTask = itemRef.put(this.fileToUpload.file, itemMeta)

      return uploadTask.on(
        'state_changed',
        (progress) => {
          this.fileToUpload.progress = Math.round(
            (progress.bytesTransferred / progress.totalBytes) * 100
          )
        },
        (error) => {
          this.fileToUpload.failed = true
          this.fileToUpload.error = error
          return false
        },
        async () => {
          const url = await uploadTask.snapshot.ref
            .getDownloadURL()
            .catch((e) => false)
          this.board.image = {
            name: itemFilename,
            originalName: this.fileToUpload.originalName,
            downloadURL: url,
            uuid: this.fileToUpload.uuid,
          }
        }
      )
    },
    createBoard() {
      console.log('clicked')
      if (this.$refs.form.validate()) {
        this.board.dateCreated = Date.now()
        this.$fire.firestore
          .collection('users')
          .doc(this.$fire.auth.currentUser.uid)
          .collection('boards')
          .doc(this.currentBoardId)
          .set(this.board)
          .then(() => {
            this.dialog = false
            this.$refs.form.reset()
            this.snackbar = true
            this.snackbarText = 'Board created'
          })
          .catch((error) => {
            this.snackbar = true
            this.snackbarText = 'Error creating board'
          })
      }
    },
  },
}
</script>
