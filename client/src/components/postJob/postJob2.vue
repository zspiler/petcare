<template>
	<v-container fill-height  >
        <v-row justify="center" align="center">
            <v-col  md="5" lg="5" class="grayBorder" align="center">

                <h1>Animal needs</h1>

                <v-row align="center">
                   
                </v-row>
            </v-col>
            <v-col  md="5" lg="5" class="grayBorder" align="center">
                <h1>User data</h1>
                    <form>
                        <v-text-field
                            label="Name"
                            required
                        />
                        <v-text-field
                            label="Surname"
                            required
                        />
                        <v-text-field
                            label="City"
                            required
                        />
                        <v-text-field
                            label="Post number"
                            required
                        />
                        <v-text-field
                            label="Address"
                            required
                        />
                        <v-text-field
                            label="Weight"
                            required
                        />
                        <v-textarea
                            label="Short description"
                            required
                        />
                         <v-btn class="mr-4" color="primary" outlined> Add animal</v-btn>
                    </form>
            </v-col>
        </v-row>
        <v-row justify="center" align="center">
            <v-col  md="1" offset-md="11">
                <router-link
                    to="/postJob3"
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
        { header: 'Today' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
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