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
[{"id":"5b7ae291.11beec","type":"imagePreview","z":"699aba61.1a36d4","width":160,"height":160,"rotate":0,"cropX":0,"cropY":0,"cropWidth":"159","cropHeight":160,"data":"http://placekitten.com/600/600","dataType":"str","autoresize":true,"flipX":true,"flipY":false,"original":true,"x":500,"y":760,"wires":[["1fb8d23f.60cbce"]]},{"id":"88a37514.5ffa68","type":"inject","z":"699aba61.1a36d4","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":280,"y":760,"wires":[["5b7ae291.11beec"]]},{"id":"1fb8d23f.60cbce","type":"debug","z":"699aba61.1a36d4","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","x":770,"y":760,"wires":[]}]
```

Reference
--------
<a href="https://flows.nodered.org/node/node-red-contrib-image-tools">node-red-contrib-image-tools</a>

