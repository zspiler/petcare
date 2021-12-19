<template>
	<v-container fluid >
        <h1>Izberite tip oglasa</h1>

        <v-row
            :class="n === 1 ? 'mb-6' : ''"
            no-gutters
            style="row"
        >
            <v-col>
                <div>
                    <b-card no-body class="overflow-hidden" style="max-width: 540px;">
                        <b-row no-gutters>
                        <b-col md="6">
                            <b-card-img src="../assets/typedog.png" alt="Image" class="rounded-0"></b-card-img>
                        </b-col>
                        <b-col md="6">
                            <b-card-body title="Horizontal Card">
                            <b-card-text>
                                This is a wider card with supporting text as a natural lead-in to additional content.
                                This content is a little bit longer.
                            </b-card-text>
                            </b-card-body>
                        </b-col>
                        </b-row>
                    </b-card>
                </div>

            </v-col>

            <v-col>
                <p>test</p>
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
     margin-top: 5%;
     font-weight: 400;
     font-size: 40px;
     margin-bottom: 2%;
 }
 .row{
     text-align: center;
 }

</style>
