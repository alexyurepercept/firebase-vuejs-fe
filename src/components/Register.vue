<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Register</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right"
                  >Role</label
                >

                <div class="col-md-6">
                  <b-form-select
                    v-model="form.role.selected"
                    :options="form.role.options"
                    class="mb-3"
                    value-field="value"
                    text-field="name"
                  ></b-form-select>
                </div>
              </div>

              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right"
                  >Email</label
                >

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="form.email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="password"
                  class="col-md-4 col-form-label text-md-right"
                  >Password</label
                >

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="form.password"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        role: {
          selected: "basic",
          options: [
            { value: "basic", name: "Basic" },
            { value: "admin", name: "Admin" }
          ]
        }
      },

      error: null
    };
  },
  methods: {
    submit() {
      let addRole = firebase.functions().httpsCallable("setUserRole");

      console.log(this.form.role.selected);
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          console.log(data.user);

          let roleData = {
            uid: data.user.uid,
            role: { [this.form.role.selected]: true }
          };
          return addRole(roleData);
        })
        .then(data => {
          firebase
            .auth()
            .signOut()
            .then(() => {
              this.$router.push("/login");
            });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>
