jQuery.sap.require("sap.m.MessageBox");

sap.ui.core.mvc.Controller.extend("com.mlauffer.barcode.view.Master", {

	onStart : function() {
		var mPayload = {
			value : $.now()
		};

		this.getView().getModel().getData().Barcodes.push(mPayload);
		this.getView().getModel().refresh(true);
	},

	onStartScan : function() {
		cordova.plugins.barcodeScanner.scan(function(result) {
			if (!result.cancelled) {
				var mPayload = {
					value : result.text
				};
				this.getView().getModel().getData().Barcodes.push(mPayload);
				this.getView().getModel().refresh(true);
			}

		}, function(error) {
			sap.m.MessageBox.alert("Scanning failed: " + error);
		});
	},

	onSync : function() {
		var mData = this.getView().getModel().getData();

		$.ajax({
			url : "",
			type : "POST",
			data : mData,
			dataType : "json",
			username : "",
			password : "",
			cache : false,
			crossDomain : true,
			xhrFields : {
				withCredentials : true
			},
			contentType : "application/json",
			success : function(data, textStatus, jqXHR) {
				alert("Conectou ao webservice!");
				// this.getView().getModel().setData();
			},
			error : function(xhr, status) {
				alert("Erro conectar ao webservice!");
			}
		});
	}

});