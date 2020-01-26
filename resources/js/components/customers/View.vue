<template>
  <div class="customer-view" v-if="customer">
    <div class="user-img">
      <img src="https://www.scottsdaleazestateplanning.com/wp-content/uploads/2018/01/user.png" alt="">
    </div>

    <div class="user-info">
      <table class="table">
        <tr>
          <th>ID</th>
          <td>{{ customer.id }}</td>
        </tr>
        <tr>
          <th>Name</th>
          <td>{{ customer.name }}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>{{ customer.email }}</td>
        </tr>
        <tr>
          <th>Phone</th>
          <td>{{ customer.phone }}</td>
        </tr>
        <tr>
          <th>Website</th>
          <td>{{ customer.website }}</td>
        </tr>
      </table>
      <router-link to="/customers">Back to all customers</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'customer-view',
  created() {
    axios.get(`/api/customers/${this.$route.params.id}`, {
      headers: {
        "Authorization": `bearer ${this.currentUser.token}`
      }
    }).then(res => {
      this.customer = res.data.customer;
    });
  },
  data() {
    return {
      customer: null
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },
}
</script>

<style scoped>
.customer-view {
    display: flex;
    align-items: center;
}
.user-img {
    flex: 1;
}
.user-img img {
    max-width: 160px;
}
.user-info {
    flex: 3;
    overflow-x: scroll;
}
</style>