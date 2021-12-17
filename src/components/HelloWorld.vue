<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

<div class="alert alert-success alert-dismissible fade show" role="alert">
  With Bootstrap!!
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>

    <button @click="getPosts()">Получить статьи</button> 
    <button @click="ShowPosts()"><span v-if="showPosts">Спрятать статьи</span><span v-else>Открыть статьи</span></button> 
    <button @click="ClearPosts()">Очистить статьи</button>
    <div>Отправлено статей: {{ getCount() }}</div>
  
    <div>
       <br>
       <div>Отправить статью на сервер</div>
       <input type="text" v-model="postBody" @change="sendPost">
    </div> 
    <div v-for="(item, index) in postedPosts()" :key="index">
       {{item}}
  
    </div>
    <div v-if="loading">Loading...</div>

    <ul v-if="errors && errors.length">
       <li v-for="(error, index) in errors" :key="index">
          {{error.message}}
       </li>
    </ul>
  <transition name="slide-fade">
<div v-show="showPosts">
    <ul v-if="posts && posts.length">
       <li v-for="(item, index) in posts" :key="index" >
          <p><b>{{item.title}}</b></p>
          <p>{{item.body}}</p>
       </li>
    </ul>
</div>
  </transition>
  </div>
</template>

<script>
import {HTTP} from '../http-common'

export default {
  name: 'HelloWorld',
  components: {
  },
  data () {
    return {
       posts: [],
       errors: [],
       loading: false,
       postBody: '',
       showPosts: true,
      selected: null
    }
  },
  props: {
    msg: {
      type: String,
      required: true
    }
  }, 
  methods: {
    ShowPosts() {
        return this.showPosts ? this.showPosts = false : this.showPosts = true
    },
    ClearPosts(){
        this.posts = [] 
    }, 
    getPosts() {
      this.loading = true
      this.posts = []
      HTTP.get('posts')
        .then(response => {
            this.posts = response.data
            console.log(this.posts)
          }
        )
        .catch(e => { this.errors.push(e)
        })
        .finally(() => (this.loading = false))
    },
    getCount() {
       return this.$store.state.count
    },
    postedPosts() {
       return this.$store.state.posts
    },
    sendPost() {
       this.loading = true
       this.$store.dispatch(
         {type: 'incrementAsync',
           amount: 1,
           text: this.postBody
         })
         localStorage.posts = JSON.stringify(this.postedPosts())
localStorage.name = this.postBody;
 console.log(this.$store.state.posts) // -> 1
 console.log(localStorage) // -> 1


       HTTP.post('posts', {
          body: this.postBody
        })
        .then(response => {})
        .catch(e => { this.errors.push(e)
        })
        .finally(() => {
              this.loading = false
              this.postBody = ''
    	})
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  /*display: inline-block;*/
  margin: 0 10px;
}
a {
  color: #42b983;
}

/* Анимации появления и исчезновения могут иметь */
/* различные продолжительности и динамику.       */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(100px);
  opacity: 0;
}
</style>
