var cur_row = null;
var next_pic = 1;  
function createPhoto(response,large) {
  if( response.type == "image" ) {
    if( response.converted != null && response.converted != "" ) {
      

			//build image
      var img = document.createElement("img");
      c = "photo"; 
      if( large ) c += " large"
      img.setAttribute("class",c);
      img.className = c;
      img.src = response.converted;
 			if(!large) img.onclick = function(){top.location.href='./photo_of.html?name='+response.name;}
      if( img.clientWidth > 200 ) {
        img.style.width = "200px"
        img.style.height = "auto"
      }
      if( img.clientHeight > 200) {
        img.style.height = "200px";
        img.style.width = "auto"
      }
			
			if (large) {
				//add image to page
				document.getElementById("results").appendChild(img);
			}
			else {
				//build frame
				var frame = document.createElement("div");
				frame.className = "photo_frame";
				frame.onclick = function(){top.location.href='./photo_of.html?name='+response.name;}
				//add image to frame
				frame.appendChild(img);
				//add frame to page
				document.getElementById("results").appendChild(frame);
			}

    }
   }
}

function nameFromAssetName(aname) {
  parts = aname.replace(/-+/g,"-");
  parts = parts.split(/-/g);
  rname = "";
  for( i = 0; i < parts.length; i++) {
    if( isNaN(parseInt(parts[i]))) {
      parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].substring(1,parts[i].length);
      rname += parts[i] + " ";
    }
  }
  return rname
}

function createComment(response) {
  var d = document.createElement("div");
  d.setAttribute("class","comment");
  d.className = "comment"
  d.id = "comment_"+response.id
  d.innerHTML = response.contents + "<br /><br /><b style='font-size:10px'>" + response.created_at.split("+")[0] + "</b>"
  document.getElementById("comments").appendChild(d)
}

function getParam(which) {
  var params = location.href.split("?");
  if( params.length == 1 ) return ""
  params = params[1]
  params = params.split(/&/g);
  for(i = 0; i < params.length; i++) {
    vals = params[i].split("=");
    if( vals[0] == which )
      return vals[1];
  }
  return ""
}

var PHOTO_BUCKET = "HahaYoureInAPhoto";
var HAHA_DATABASE_FILENAMES = "HahaDB1";
var HAHA_DATABASE_NAMES = "HahaDB2";

var api = new DropioApiClient("");

