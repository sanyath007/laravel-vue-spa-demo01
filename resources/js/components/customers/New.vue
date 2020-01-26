<template>
  <div class="customer-new">
    <form @submit.prevent="add">
      <div class="form-group">
        <label for="name">Name :</label>
        <input type="text" class="form-control" placeholder="Name" v-model="customer.name">
      </div>
      <div class="form-group">
        <label for="email">Email :</label>
        <input type="text" class="form-control" placeholder="Name" v-model="customer.email">
      </div>
      <div class="form-group">
        <label for="phone">Phone :</label>
        <input type="text" class="form-control" placeholder="Phone" v-model="customer.phone">
      </div>
      <div class="form-group">
        <label for="website">Website :</label>
        <input type="text" class="form-control" placeholder="Website" v-model="customer.website">
      </div>

      <button type="submit" class="btn btn-primary float-right">Create</button>
      <router-link to="/customers" class="float-left">Cancel</router-link>
    </form>

    <div class="errors" v-if="errors">
      <ul>
        <li v-for="(fieldError, fieldName) in errors" :key="fieldName">
          <strong>{{ fieldName }}</strong>: {{ fieldError.join('\n') }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import validate from 'validate.js';
import axios from 'axios';

export default {
  name: 'new',
  data() {
    return {
      customer: {
        name: '',
        email: '',
        phone: '',
        website: ''
      },
      errors: null
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },
  methods: {
    add() {
      this.errors = null;

      const constraints = this.getConstrains();

      const errors = validate(this.$data.customer, constraints);

      if(errors) {
        this.errors = errors;
      }

      axios.post('/api/customers/new', this.$data.customer, {
        headers: {
          "Authorization": `bearer ${this.currentUser.token}`
        }
      }).then(res => {
        this.$router.push('/customers');
      }).catch(err => console.log(err));
    },
    getConstrains() {
      return {
        name: {
          presence: true,
          length: {
            minimum: 3,
            message: "Must be at least 3 characters long"
          }
        },
        email: {
          presence: true,
          email: true
        },
        phone: {
          presence: true,
          numericality: true,
          length: {
            minimum: 10,
            message: "Must be at least 10 digits long"
          }
        },
        website: {
          presence: true,
          url: true
        }
      }
    }
  },
}
</script>

<style scoped>
.errors {
  background-color: lightcoral;
  border-radius: 5px;
  padding: 21px 0 2px 0;
  margin-top: 20px;
}
</style>