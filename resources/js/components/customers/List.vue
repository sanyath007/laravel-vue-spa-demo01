<template>
  <div class="responsive">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="true"
    />

    <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="responseErrors">
      <strong>Error {{ responseErrors.code }}</strong> : {{ responseErrors.message }}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div class="btn-wrapper">
      <router-link to="/customers/new" class="btn btn-primary btn-sm">New</router-link>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="!customers.length">
          <tr>
            <td colspan="4" class="text-center">No customer available !!</td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="customer in customers" :key="customer.id">
            <td>{{ customer.name }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phone }}</td>
            <td>
              <router-link :to="`/customers/${customer.id}`">View</router-link>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <nav aria-label="Page navigation example" v-if="pagination">
      <ul class="pagination">
        <li class="page-item" :class="{disabled: pagination.current_page == 1}">
          <a class="page-link" href="#" @click="getCustomerData(pagination.prev_page_url)">Previous</a>
        </li>
        <li 
          class="page-item"
          v-for="i in pagination.last_page"
          :key="i"
          :class="{active: pagination.current_page == i}"
        >
          <a class="page-link" href="#" @click="getCustomerData(pagination.path + `?page=${i}`)">{{ i }}</a>
        </li>
        <li class="page-item" :class="{disabled: pagination.current_page == pagination.last_page}">
          <a class="page-link" href="#" @click="getCustomerData(pagination.next_page_url)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'list',
  components: {
    Loading
  },
  mounted() {
    if(this.customers.length) {
      return;
    }

    this.$store.dispatch('getCustomers');
  },
  computed: {
    customers() {
      return this.$store.getters.customers;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    responseErrors() {
      return this.$store.getters.responseErrors;
    },
    pagination() {
      return this.$store.getters.pagination;
    }
  },
  methods: {
    getCustomerData(url) {
      console.log(url)
      this.$store.dispatch('getCustomers', url);
    }
  },
}
</script>

<style scoped>
.btn-wrapper {
  text-align: right;
  margin-bottom: 20px;
}
</style>