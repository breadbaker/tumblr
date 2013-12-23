# Tumblr Clone


In this project I cloned the popular blogging site tumblr.

The live version is up [here](http://tumblr-clone.herokuapp.com/)

Some of the technologies featured include:


 # Polymorphic Associations
 
Posts can be of different types ie: Text, Quote, Photo.

All posts share some datafields ie: post_date, user_id

To avoid having to call:
    current_user.text_posts and
    current_user.photo_posts then merging.
    
    the Post Model holds a field 'content_type' which is a string reference to the model name of the content the post holds. Thus to access a posts content I can use: 
    
    // in post.rb
    def content
      return false unless self.content_type
      self.content_type.constantize.find_by_post_id(self.id)
    end
    
 # Amazon Cloud Storage.
 
None of the photos are held on heroku.  Use the paperclip gem to store my photos in a bucket at AWS.

 # Rich Text Editor Plugin
 
There are indeed many plugins to do rich text editng ( tinyMCE, nicEdit ...).  After playing with both a little I discovered that the meat of what they do is centered around this [command](https://developer.mozilla.org/en-US/docs/Web/API/document.execCommand):

    document.execCommand()  
    
So I spent a day writing my own [library](https://github.com/breadbaker/Breaditor) for repeated use that fits my needs.  Rome was not built in a day, while functional there are bugs listed in issues.  And it works only in Chrome.

The content is scraped from popular real tumblr pages and scraped with the gem nokogiri.

