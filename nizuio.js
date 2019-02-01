/*
Nizu Core JS Library
v 1.2.1
Author RGW IT SERVICES
Web: nizu.be
*/
// File Upload Functions
function nizu_secondsToTime(secs) { // we will use this function to convert seconds in normal time format
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600))/60);
    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));
    if (hr < 10) {hr = "0" + hr; }
    if (min < 10) {min = "0" + min;}
    if (sec < 10) {sec = "0" + sec;}
    if (hr) {hr = "00";}
    return hr + ':' + min + ':' + sec;
}
function nizu_bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
}
String.prototype.left = function(n) {
    return this.substring(0, n);
};
function nizu_generatePin () {
    min = 0,
    max = 9999;
    return ("0" + (Math.floor(Math.random() * (max - min + 1)) + min)).substr(-4);
}
function loadStyleSheet(src,callback) {
    if (document.createStyleSheet){
        document.createStyleSheet(src);
    }
    else {
        $("head").append($("<link rel='stylesheet' href='"+src+"' type='text/css' media='screen' />"));
    }
    callback();
};
function nizu_ValidateEmail(mail){  
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
  {  
    return (true)  
  }
    return (false)  
}  
function nizu_guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
function nizu_formatTime(time) {
    var result = false, m;
    var re = /^\s*([01]?\d|2[0-3]):?([0-5]\d)\s*$/;
    if ((m = time.match(re))) {
        result = (m[1].length == 2 ? "" : "0") + m[1] + ":" + m[2];
    }
    return result;
}
function nizu_phoneFormat(phone) {
    /*
    This function will return a correct ISO International
    Phone Number format
    */
  phone = phone.replace(/[^0-9]/g, '');
  phone = phone.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, "+($1) $2-$3-$4");
  return phone;
}
function nizu_getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}
function nizu_executeFunctionByName(functionName, context /*, args */) {
    if (functionName.length>0 && functionName!="null") {
        console.log("executing function:"+functionName);
        var args = [].slice.call(arguments).splice(2);
        var namespaces = functionName.split(".");
        var func = namespaces.pop();
        for(var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func].apply(context, args);
    }
}
function nizu_loaderON(message){
	if (message) {
		nizu_loader(message,true);	
	}
}
function nizu_loaderOFF() {
	nizu_loader("",false);
}
function nizu_GetData(options,loadingmessage,callback) {
	if (options) {
		if (loadingmessage) {
		    /* Activating loading animation while the transaction is close */
		    nizu_loaderON(loadingmessage);
		}
		if (nizu_serverurl.length>0) {
		    $.post(nizu_serverurl, options, function(result,status){
			if (status=="success") {
			    if (loadingmessage>0) {
				 nizu_loaderOFF();
			    }
			    if (result.length>0) {
				var ans=JSON.parse(result);
				if (typeof ans.errcode !== 'undefined') {
				    if (ans.errcode>0) {
					//$("#alertmsg").text(ans.errmsg);
					let myNotification = new Notification('Error', {
					    body: ans.errmsg
					});
					//$.unblockUI(); 
					if(callback) { callback(ans);} else {
					    console.log("nizu_GetData Error callback");
					    return ans;
					}
				    }
				} else {
				    if(callback) {callback(ans);}
				}
			    } else {
				var ans=[0];
				callback(ans);
			    }
			} else {
			    /* Something went wrong */
			    nizu_loaderOFF();
			    console.log("getData transaction error");
			}
		    });
		}
	} else {
		console.log("options incorrect");
	}
}
