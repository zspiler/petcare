<template>
	<v-container fill-height  >
        <v-row justify="center" class="grayBorder">
            <v-col  md="6" lg="6"  align="center">
            </v-col>
            <v-col  md="6" lg="6" align="center">
                
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import axios from "axios";
    export default {
    name: "Details",
    async created() {
        this.id = this.$route.params.serviceId
        this.getData()
    },
    data: () => ({
        url: 'http://localhost:5000/api/',
        id: '',
    }),
    watch:{
    },
    methods: {
        async getData(){
            try {
                const response = await axios.get(`${this.url}service/byId`,{
                    params:{
                        id: this.id
                    }
                })
                console.log(response)
            } catch (err) {
                console.error(err)
            }
        }
    },
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