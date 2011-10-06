##What it does.
The JQuery Image Eventer plugin is an event driven image load detector. When groups of images are loaded, $.image_eventer will trigger an event. You may then, in your own client-side code, bind to that event and the world is then (and only then) your oyster.  

If you are using Image Eventer and have a feature request or bug report, please file it at the [Issue queue](https://github.com/technicolorenvy/jquery-image_eventer/issues).

##Info

You can massage your load times by compressing your code and compressing your images, however, in the end, they are a fact of life we have to face and deal with gracefully.  

The goal of $.image_eventer is to simplify a common task that many of us face. $.image_eventer will give you the ability to bind to events as images load and won't make assumptions. You may want to simply show images once a collection has loaded, or fadeIn each image gracefully as they are ready. It's your choice. You get what you give.  

##Version History

####1.0beta3
- Fixed IE bug
- Changed plugin name from $.pil to $.image_eventer

####1.0beta2
- Added support for jQuery parents
- Minor refactors for performance

####1.0beta1
- Initial release