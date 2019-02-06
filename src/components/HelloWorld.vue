<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

<div class="alert alert-success alert-dismissible fade show" role="alert">
  With Bootstrap!
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>

      <cool-select
        v-model="selected"
        :items="items"
        placeholder="Select name"
      />


    <button @click="getPosts()">Получить статьи</button>
    <div>Отправлено статей: {{ getCount() }}
    </div>
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
    <ul v-if="posts && posts.length">
       <li v-for="(item, index) in posts" :key="index" >
          <p><b>{{item.title}}</b></p>
          <p>{{item.body}}</p>
       </li>
    </ul>
  </div>
</template>

<script>
import {HTTP} from '../http-common'
import { CoolSelect } from "vue-cool-select"

export default {
  name: 'HelloWorld',
  components: {
    CoolSelect
  },
  data () {
    return {
       posts: [],
       errors: [],
       loading: false,
       postBody: '',
      selected: null,
      items: [
        'Anton',
        'Andrey',
        'Sasha',
        'Vladimir',
        'Dima'
      ]
    }
  },
  props: {
    msg: {
      type: String,
      required: true
    }
  }, 
  methods: {
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
 console.log(this.$store.state.posts) // -> 1

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
</style>
