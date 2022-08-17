export default function({app, route, redirect}){
    if(route.path !== '/auth'){
        if(!app.$fire.auth.currentUser){
            return redirect('/auth')
        }
    } else{
        if(!app.$fire.auth.currentUser){
            return
        } else{
            return redirect('/')
        }
    }
}