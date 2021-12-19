<template>
	<v-container fluid >
        <h1>Izberite tip oglasa</h1>

        <v-row
            :class="n === 1 ? 'mb-6' : ''"
            no-gutters
            style="row"
        >
            <v-col>
                <router-link to="/postJob1" style="text-decoration: none; color: inherit">
                    <div class="column">
                        <b-card no-body class="overflow-hidden card"  style="max-width: 650px; padding: 0px 10px 10px 15px;">
                            <b-row>
                                <b-col md="6">
                                    <v-img
                                        class="image"
                                        width="500"
                                        src="../assets/typedog.png"
                                    ></v-img> 		
                                </b-col>
                                <b-col md="6">
                                    <b-card-body class="cardTitle" title="Potrebujete varstvo?">
                                    <b-card-text class="text">
                                        Potrebujete nekoga, ki bo skrbel za vašega ljubljenčka, medtem ko boste odsotni.
                                    </b-card-text>
                                    </b-card-body>
                                </b-col>
                            </b-row>
                        </b-card>
                    </div>
                </router-link>
            
            </v-col>
            <v-col>
                <div class="column2">
                    <b-card no-body class="overflow-hidden card"  style="max-width: 650px; padding: 0px 10px 10px 15px;">
                        <b-row>
                            <b-col md="6">
                                <b-card-body class="cardTitle" style="word-break: break-word" title="Nudite storitve?">
                                <b-card-text class="text">
                                    Ste radi v stiku z živalmi, in vam ni težko očistiti akvarij, ter bi s tem tudi kaj zaslužili.
                                </b-card-text>
                                </b-card-body>
                                
                            </b-col>
                            <b-col md="6">
                                <v-img
                                    class="image"
                                    width="500"
                                    src="../assets/typeaquarium.png"
                                ></v-img> 		
                            </b-col>
                        </b-row>
                    </b-card>
                </div>

            </v-col>
        </v-row>

    </v-container>

</template>

<script>
export default {};
</script>

<style>

 h1{
     text-align: center;
     margin-top: 5% !important;
     font-weight: 400;
     font-size: 40px;
     margin-bottom: 2%;
 }
 .row{
     text-align: center;
 }
 .card{
     border-radius: 50px !important;
     border: none !important;
     background-color: #F0F2EF !important;
 }
.column{
     margin-top: 10%;
     margin-right: 20px;
 }
.column2{
     margin-top: 10%;
     margin-left: 20px;
 }
 .text{
     margin-top: 30%;
     font-size: 18px;
     text-align: left;
 }
 .cardTitle{
    margin-top: 30px;
}
.image{
    border-radius: 50px;
}
.card-title{
    font-size: 40px;
}

</style>
