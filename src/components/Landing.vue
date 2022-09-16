<template>
  <v-app id="inspire">
    <v-toolbar
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 500px" class="ml-0 pl-3">
        <span>SciComp User App Deployment Request</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-jumbotron color="grey lighten-4">
      <v-container fill-height>
        <v-layout align-center>
          <v-flex>
            <h3 class="display-3"></h3>
            <div class="title mb-3">To submit your application, please click the red button to fill the form</div>
            <p>You may also want to review <a href="http://sciwiki.fredhutch.org/compdemos/shiny/" target="_blank">FredHutch/wiki shiny app user documentation</a> before proceed.</p>
            <v-divider class="my-3"></v-divider>
            <p><span v-if="this.status !== ''" class="subheading">CURRENT STATUS: {{this.response}} @ {{this.status}} </span></p>            
            <p><span v-if=!valid style="color:red;">NOT VALID ..... Please Check the required fields and re-submit!</span></p>
            <v-layout row v-if=valid>
              <v-flex xs12>
                <v-card dark tile flat color="blue lighten-2">
                  <table v-if="this.request.name !== ''">
                      <td>
                        <tr class="text-xs-left">name</tr>
                        <tr class="text-xs-left">email</tr> 
                        <tr class="text-xs-left">phone</tr> 
                        <tr class="text-xs-left">dns_name</tr>
                        <tr class="text-xs-left">github_repo</tr>
                        <tr class="text-xs-left">dependencies</tr> 
                        <tr class="text-xs-left">require_public_access</tr>
                        <tr class="text-xs-left">require_password_protection</tr>
                        <tr class="text-xs-left">no_phi</tr> 
                        <tr class="text-xs-left">notes</tr>
                      </td>
                      <td>
                        <tr class="text-xs-right">{{ this.request.name}}</tr>
                        <tr class="text-xs-right">{{ this.request.email}}</tr>
                        <tr class="text-xs-right">{{ this.request.phone}}</tr>
                        <tr class="text-xs-right">{{ this.request.dns_name}}</tr>
                        <tr class="text-xs-right">{{ this.request.github_repo}}</tr>
                        <tr class="text-xs-right">{{ this.request.dependencies}}</tr>
                        <tr class="text-xs-right">{{ this.request.require_public_access}}</tr>
                        <tr class="text-xs-right">{{ this.request.require_password_protection}}</tr>
                        <tr class="text-xs-right">{{ this.request.no_phi}}</tr>
                        <tr class="text-xs-right">{{ this.request.notes}}</tr>
                      </td>
                  </table>
                </v-card>
              </v-flex>
            </v-layout>
            <v-btn
              fab
              bottom
              right
              color="pink"
              dark
              fixed
              @click.stop="dialog = !dialog"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>  
          <v-container
            fluid
            style="min-height: 0;"
            grid-list-lg
          >
            <v-dialog v-model="dialog" width="800px">
              <v-form v-model="valid" ref="form" lazy-validation>
              <v-card>
                <v-card-title
                  class="grey lighten-4 py-4 title"
                >
                  Request for Application Deployment
                </v-card-title>
                <v-container grid-list-sm class="pa-4">
                  <v-layout row wrap>
                    <v-flex xs12 align-center justify-space-between>
                      <v-layout align-center>
                        <v-avatar size="40px" class="mr-3">
                          <img
                            src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                            alt=""
                          >
                        </v-avatar>
                        <v-text-field v-model="request.name"
                          placeholder="Name"
                          :rules="requiredRules"
                          required
                        >{{ request.name }}</v-text-field>
                      </v-layout>
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field v-model="request.email"
                        prepend-icon="mail"
                        placeholder="<institutional email>@fredhutch.org"
                        :rules="requiredRules"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs6>
                      <v-text-field v-model="request.phone"
                        type="tel"
                        prepend-icon="phone"
                        placeholder="(000) 000 - 0000"
                        mask="phone"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field v-model="request.dns_name"
                        prepend-icon="dns"
                        placeholder="name of your site"
                        suffix=".fredhutch.org"
                        :rules="requiredRules"
                        required
                      >{{request.dns_name}}</v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field v-model="request.github_repo"
                        prepend-icon="code"
                        placeholder="FredHutch/<yourapp_repo_name>"
                        :rules="requiredRules"
                        required
                      >{{request.github_repo}}</v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field v-model="request.dependencies"
                        placeholder="Dependencies separated by comma, if there is none additional to shiny then put NA"
                        prepend-icon="settings_applications"
                        :rules="requiredRules"
                        required
                      >{{request.dependencies}}</v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-checkbox
                        v-model="request.require_password_protection"
                        label="Requires password protection"
                      ></v-checkbox>
                    </v-flex>
                    <v-flex xs12>
                      <v-checkbox
                        v-model="request.require_public_access"
                        label="Requires publicly accessible from the Internet"
                      ></v-checkbox>
                    </v-flex>
                    <!-- <v-checkbox
                      v-model="request.collaborator"
                      :rules="[v => !!v || 'You must agree to continue!']"
                      label="[GitHub] Added SciComp contact as collaborator with Admin"
                      required
                    ></v-checkbox> -->
                    <v-flex xs12>  
                    <v-checkbox
                      v-model="request.no_phi"
                      :rules="[v => !!v || 'You must agree to continue!']"
                      label="I certify that there is No PHI or other sensitive information in this application."
                      required
                    ></v-checkbox>
                    </v-flex>
                    <v-flex xs12> 
                      <v-textarea outline
                      v-model="request.notes"
                      label="Comments/Questions"
                      rows="15"
                      auto-grow
                      counter=4000
                    ></v-textarea>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-card-actions>
                  <!-- <v-btn flat color="primary">More</v-btn> -->
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
                  <v-btn flat v-on:click="save" @click="dialog = false" v-bind:disabled=!valid>Save</v-btn>
                </v-card-actions>
              </v-card> 
              </v-form>
            </v-dialog>
          </v-container>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
    export default {
    name: 'Landing',
    data: () => ({
      dialog: false,
      valid: false,
      error:'',
      status:'',
      message:{
        email:''
      },
      request: {
        name:'',
        email:'',
        phone: '',
        dns_name:'',
        github_repo:'',
        dependencies:'',
        require_public_access:false,
        require_password_protection:false,
        no_phi:false,
        notes:''
      },
      response:''
    }),
    computed: {
      requiredRules() {
        return [v => !!v || 'This field is required']
      },
      emailRules() {
        return [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
      }
    },
    methods: {
      save: function () {
        if (this.valid && this.$refs.form.validate()) {
          console.log(this.request);
          this.$http
            .post('/notify', JSON.stringify(this.request), {headers:{
            // .post('http://localhost:3000' + '/notify', JSON.stringify(this.request), {headers:{
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0'
              }})
            .then(response => {
                console.log(response);
                this.status = Date();
                this.response = response.body;
            })
        } else {
          alert('Please fill all the required field.');
        }
      }
    }
  }
</script>
