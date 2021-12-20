<template>
	<v-container fill-height  >
        <v-row justify="center">
            <v-col  md="6" lg="6" class="grayBorder" align="center">

                <h1>Animal needs</h1>
                <v-virtual-scroll
                    :bench="benched"
                    height="480"
                    item-height="150"
                    :items="items"
                >
                    <template v-slot:default="{ item }">
                    <v-list-item :key="item">
                        <v-row>
                            <v-col md="4">
                                <v-img
                                    class="img-circle img-animated" 
                                    alt="Animal's image"
                                    height="100"
                                    max-width="100"
                                    :src="item.avatar"
                                />
                                <b>{{item.title}}</b>
                            </v-col>
                            <v-col md="8">
                                <v-textarea
                                    v-model="item.description"
                                    height=100
                                />
                            </v-col>
                        </v-row>
                        </v-list-item>
                    </template>
                </v-virtual-scroll>     
            </v-col>
            <v-col  md="5" lg="5" class="grayBorder" align="center">
                <h1>User data</h1>
                    <form>
                        <v-row>
                            <v-col>
                                <p style="marginTop:20px; marginBottom:-30px;">Check if your data is correct.</p>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    label="Name"
                                    required
                                />
                            </v-col>
                            <v-col>
                                <v-text-field
                                    label="Surname"
                                    required
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <p style="marginTop:20px; marginBottom:-30px;">Residence information will only be visible once you have confirmed your service person.</p>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    label="Address"
                                    required
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    label="City"
                                    required
                                />
                            </v-col>
                            <v-col>
                                <v-text-field
                                    label="Post number"
                                    required
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-menu
                                    v-model="menu1"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="date"
                                        label="Date from"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                    v-model="date"
                                    @input="menu1 = false"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col>
                                <v-menu
                                        v-model="menu2"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="date"
                                            label="Date to"
                                            prepend-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker
                                        v-model="date"
                                        @input="menu2 = false"
                                        ></v-date-picker>
                                    </v-menu>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field
                                    label="Price per day"
                                    required
                                />
                                
                            </v-col>
                        </v-row>
                        <p>Total: <b>150 €</b></p>
                         <v-btn class="mr-4" color="primary" outlined>Post job</v-btn>
                    </form>
            </v-col>
        </v-row>
        <v-row justify="center" align="center">
            <v-col  md="1" offset-md="11">
                <router-link
                    to="/postJob/complete"
                    style="text-decoration: none; color: inherit"
                >
                    <v-btn class="mr-4" color="primary">Next</v-btn>
                </router-link>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Mucek pupa',
          description: `Spucaj kletko, nalij vodo`,
        },
         {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Mucek pupa',
          description: `Spucaj kletko, nalij vodo`,
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Mucek pupa',
          description: `Spucaj kletko, nalij vodo`,
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Mucek pupa',
          description: `Spucaj kletko, nalij vodo`,
        },
      ],
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
    }),
  }
</script>

<style>
    .img-circle {
        border-radius: 50%;
    }
    .img-animated {
        transition: all .15s ease-in-out;
    }
    .grayBorder {
        background-color: #F0F2EF;
        border-radius: 20px;
    }
</style>