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
              name="title"
              type="text" 
            ></v-text-field>
            <v-btn v-if="enableColor === false" depressed @click="enableColor = true">
              Choose board color
            </v-btn>
            <br>
            <v-color-picker
           
             v-if="enableColor === true"
              dot-size="25"
              hide-inputs
              swatches-max-height="100"
            ></v-color-picker>
            <div
              class="d-flex flex-column align-center justify-center flex-grow-1 upload-block"
            
             
            >
              <!-- <template
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
              </template> -->
            </div>
            <v-btn :disabled="!valid" color="primary" @click="createBoard"
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
</v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  data(){
    return{
      dialog:false
    }
  },

  methods:{
    addBoard(){
      this.dialog = true
    }
  }
}
</script>
