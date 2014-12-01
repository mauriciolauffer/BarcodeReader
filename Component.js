jQuery.sap.declare("com.mlauffer.barcode.Component");

sap.ui.core.UIComponent.extend("com.mlauffer.barcode.Component", {

	metadata : {
		name : "Barcode Reader",
		version : "1.0.0",
		includes : [],
		dependencies : {
			libs : [ "sap.m", "sap.ui.layout" ],
			components : []
		},
		rootView : "com.mlauffer.barcode.view.App",

		config : {
			resourceBundle : "i18n/messageBundle.properties",
			serviceConfig : {
				name : "BarcodeReader",
				serviceUrl : "./model/mock.json"
			}
		},

		routing : {
			config : {
				// routerClass : com.mlauffer.barcode.MyRouter,
				viewType : "XML",
				viewPath : "com.mlauffer.barcode.view",
				// targetAggregation : "detailPages",
				clearTarget : false
			},
			routes : [ {
				pattern : "",
				name : "main",
				view : "Master",
				targetAggregation : "pages",
				targetControl : "idAppControl"
			} ]
		}
	},

	init : function() {

		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
		var mConfig = this.getMetadata().getConfig();

		// always use absolute paths relative to our own component
		// (relative paths will fail if running in the Fiori Launchpad)
		var rootPath = jQuery.sap.getModulePath("com.mlauffer.barcode");

		// set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : [ rootPath, mConfig.resourceBundle ].join("/")
		});
		this.setModel(i18nModel, "i18n");

		// Create and set domain model to the component
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.loadData(mConfig.serviceConfig.serviceUrl);
		this.setModel(oModel);

		this.getRouter().initialize();
	},
});