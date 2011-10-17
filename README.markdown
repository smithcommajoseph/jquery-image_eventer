##What it does.
The jQuery Image Eventer plugin is an event driven image load detector. As collections of images are loaded into the DOM, $.image_eventer will trigger the appropriate, predefined events.  

You may then, in your own client-side code, bind to those events.  

##Info
You can massage your load times by compressing your assets and utilizing lazy loading. However, load times are a fact of life that developers have to face and deal with gracefully.  

$.image_eventer simplifies one component of this common task. It gives you the ability to bind to events as images load and doesn't make assumptions.  

You may simply want to show images once a collection has loaded, or fade in each image gracefully as they are ready. Other use-cases may include using $.image_eventer to fire events as images load and update a progressbar.  

It's your choice. You get what you give.  

##Bugs?  
If you are using Image Eventer and have a feature request or bug report, please file it at the [Issue queue](https://github.com/technicolorenvy/jquery-image_eventer/issues).  

##Version History

####1.0beta5
- General Optimization

####1.0beta4
- Fixed multiple jQuery wrapper bug

####1.0beta3
- Fixed IE bug
- Changed plugin name from $.pil to $.image_eventer

####1.0beta2
- Added support for jQuery parents
- Minor refactors for performance

####1.0beta1
- Initial release