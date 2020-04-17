node-red-contrib-image-simple-node
============================

FEATURES
--------
* image
<p>Edit image simple: resize, rotate, crop and download edited image as "image_edit.png"</p>
  <p>Input Parameters:
      <ul>
          <li><b>payload</b> - The image file input or the <code>msg.[name]</code> property</li>
          <li><b>localFilename</b> - The downloaded local file name <code>msg.localFilename</code> property</li>
      </ul>
  </p>
  <p>Return values:
      <ul>
          <li>Will either be success or provide an error state</li>
      </ul>
  </p>
</p>

![Image](https://cdn.jsdelivr.net/gh/taminhhienmor/node-red-contrib-image-simple-node/image/image_demo.png)
``` node
[{"id":"a649449e.8092b8","type":"inject","z":"699aba61.1a36d4","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":180,"y":740,"wires":[["b20b69b1.f8ed98"]]},{"id":"b20b69b1.f8ed98","type":"imageSimple","z":"699aba61.1a36d4","imageData":"http://placekitten.com/600/600","imageType":"str","autoresize":true,"original":false,"flipX":false,"flipY":false,"width":"200","height":200,"rotate":0,"cropX":0,"cropY":0,"cropWidth":"200","cropHeight":"200","x":450,"y":740,"wires":[["1e2ad015.b3c39"]]},{"id":"1e2ad015.b3c39","type":"debug","z":"699aba61.1a36d4","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":710,"y":740,"wires":[]}]
```

Reference
--------
<a href="https://flows.nodered.org/node/node-red-contrib-image-tools">node-red-contrib-image-tools</a>

