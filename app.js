var express = require( 'express' );
var app = express();
var logger = require( './logger' );



app.use( express.static( 'public' ) );

var blocks = require('./routes/blocks');
app.use( '/blocks', blocks );
app.use( logger );


/*app.get( '/', function( request, response ) {
  response.sendFile( __dirname + '/public/index.html' );
} );*/


app.param( 'name', function( request, response, next ) {
  var name = request.params.name;
  //convierte la primera letra en mayuscula y lo demas en minuscula
  var block = name[ 0 ].toUpperCase() + name.slice( 1 ).toLowerCase();

  request.blockName = block;
  next();
} );

app.route( '/locations/:name' )
.get(  function( request, response ) {
  var location = locations[ request.blockName ];

  if( !location ) {
    response.status( 404 ).json( 'No description found for ' + request.params.name );
  } else{
    response.json( location );
  }
} );




app.listen( 3000 );
