var Jimp = require('jimp');
var fs = require("fs");
module.exports = function (RED) {
	function imageSimple(config) {
		"use strict";

		RED.nodes.createNode(this, config);
		var node = this;

		// data image
		var imageData = config.imageData || "";
		var imageType = config.imageType || "msg";
		var globalContext = this.context().global;
        var flowContext = this.context().flow;
		
		// width & height
		var width = parseInt(config.width)
		var height = parseInt(config.height)
		var autoresize = config.autoresize

		// flip
		var flipX = config.flipX
		var flipY = config.flipY

		// rotate
		var rotate = parseInt(config.rotate) || 0

		// crop
		var cropFlag = config.crop || false
		var cropX = parseInt(config.cropX) || 0 
		var cropY = parseInt(config.cropY) || 0
		var cropWidth = parseInt(config.cropWidth) || 0 
		var cropHeight = parseInt(config.cropHeight) || 0

		// original
		var original = config.original

		// local file
		var localfile = config.localfile

		// clear image
		RED.comms.publish("image_png", { id: this.id, imageData: "" });

		node.on("input", function (msg) {
			node.status({});
			var image = "";
			switch (imageType) {
				case "str":
					image = imageData
					break;
				case "msg":
					image = msg[imageData]
					break;
				case "flow":
					image = flowContext.get(imageData)
					break;
				case "global":
					image = globalContext.get(imageData)
					break;
				default:
					image = imageData
					break;
			}			
			if (!image || typeof(image) == "number") {
				node.error(RED._("Check the Image parameter"),msg)
				node.status({fill:"red",shape:"ring",text:"Check Image"});        
				return;
			}

			msg.localFilename = msg.localFilename || 'image_edit.png'
			var idNow = this.id

			if (localfile) {
				var linkLocalFile = image
				try {
					if (original) {
						fs.readFile(linkLocalFile, (err, image) => {
							Jimp.read(image, (err, img) => {
								if (err) {
									node.error(RED._("Image not found!"),msg)
									node.status({fill:"red",shape:"ring",text:"image invalid"});        
									return;
								};
								img
								.resize(img.bitmap.width, img.bitmap.height)					
								.write(msg.localFilename)
								.getBase64(Jimp.MIME_PNG, (errPng, pngData) => {
									if (errPng) {
										node.error(RED._("Error getting base64 image"),msg)
										node.status({fill:"red",shape:"ring",text:"image invalid"});        
										return;
									}								
									RED.comms.publish("image_png", { id: idNow, imageData: pngData });
								});
							});
							
						})
					} else {
						fs.readFile(linkLocalFile, (err, image) => {
							Jimp.read(image, (err, img) => {
								if (err) {
									node.error(RED._("Image not found!"),msg)
									node.status({fill:"red",shape:"ring",text:"image invalid"});        
									return;
								};
								if (autoresize) {
									height = img.bitmap.height / (img.bitmap.width / width);
								}
								img
								.resize(width, height)
								.rotate(rotate)
								if(!cropFlag) {
									if (cropX + cropWidth > width) {
										node.error(RED._("cropX and cropWidth are larger width(" + width + ")!"),msg)
										node.status({fill:"red",shape:"ring",text:"crop invalid"});        
										return;
									} else if (cropY + cropHeight > height ) {
										node.error(RED._("cropY and cropHeight are larger height(" + height + ")!"),msg)
										node.status({fill:"red",shape:"ring",text:"crop invalid"});        
										return;
									} else {
										img.crop(cropX, cropY, cropWidth, cropHeight)
									}
								}
								img.flip(flipX, flipY)
								.write(msg.localFilename)
								.getBase64(Jimp.MIME_PNG, (errPng, pngData) => {
									if (errPng) {
										node.error(RED._("Error getting base64 image"),msg)
										node.status({fill:"red",shape:"ring",text:"image invalid"});        
										return;
									}						
									RED.comms.publish("image_png", { id: idNow, imageData: pngData });
								});
							});
						})
					}
					node.send(msg);
				} catch (error) {
					node.error(RED._("Error getting image"),msg)
					node.status({fill:"red",shape:"ring",text:"image invalid"});        
					return;
				}
			} else {
				try {
					if (original) {
						Jimp.read(image, (err, img) => {
							if (err) {
								node.error(RED._("Image not found!"),msg)
								node.status({fill:"red",shape:"ring",text:"image invalid"});        
								return;
							};
							img
							.resize(img.bitmap.width, img.bitmap.height)					
							.write(msg.localFilename)
							.getBase64(Jimp.MIME_PNG, (errPng, pngData) => {
								if (errPng) {
									node.error(RED._("Error getting base64 image"),msg)
									node.status({fill:"red",shape:"ring",text:"image invalid"});        
									return;
								}								
								RED.comms.publish("image_png", { id: this.id, imageData: pngData });
							});
						});
					} else {
						Jimp.read(image, (err, img) => {
							if (err) {
								node.error(RED._("Image not found!"),msg)
								node.status({fill:"red",shape:"ring",text:"image invalid"});        
								return;
							};
							if (autoresize) {
								height = img.bitmap.height / (img.bitmap.width / width);
							}
							img
							.resize(width, height)
							.rotate(rotate)
							if(!cropFlag) {
								if (cropX + cropWidth > width) {
									node.error(RED._("cropX and cropWidth are larger width(" + width + ")!"),msg)
									node.status({fill:"red",shape:"ring",text:"crop invalid"});        
									return;
								} else if (cropY + cropHeight > height ) {
									node.error(RED._("cropY and cropHeight are larger height(" + height + ")!"),msg)
									node.status({fill:"red",shape:"ring",text:"crop invalid"});        
									return;
								} else {
									img.crop(cropX, cropY, cropWidth, cropHeight)
								}
							}
							img.flip(flipX, flipY)
							.write(msg.localFilename)
							.getBase64(Jimp.MIME_PNG, (errPng, pngData) => {
								if (errPng) {
									node.error(RED._("Error getting base64 image"),msg)
									node.status({fill:"red",shape:"ring",text:"image invalid"});        
									return;
								}						
								RED.comms.publish("image_png", { id: this.id, imageData: pngData });
							});
						});
					}
					node.send(msg);
				} catch (error) {
					node.error(RED._("Error getting image"),msg)
					node.status({fill:"red",shape:"ring",text:"image invalid"});        
					return;
				}
			}
		});
	}
	RED.nodes.registerType("imageSimple", imageSimple);
};