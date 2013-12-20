@photo_urls = [
  "http://i.imgur.com/aXUCaO5.jpg",
  "http://i.imgur.com/ugc4EBb.jpg",
  "http://i.imgur.com/ZSyvHdt.jpg",
  "http://i.imgur.com/13b9nyL.jpg",
  "http://i.imgur.com/gKoEWKN.jpg",
  "http://i.imgur.com/gKoEWKN.jpg",
  "http://i.imgur.com/UVkkoc9.jpg",
  "http://i.imgur.com/UVkkoc9.jpg",
  "http://i.imgur.com/OxW8iJk.jpg",
  "http://i.imgur.com/Lstj8cB.jpg",
  "http://i.imgur.com/06H8Wei.jpg",
  "http://i.imgur.com/zcImiaF.jpg",
  "http://i.imgur.com/tuxiB19.jpg",
  "http://i.imgur.com/zcImiaF.jpg",
  "http://i.imgur.com/0reS5do.jpg",
  "http://i.imgur.com/zcImiaF.jpg",
  "http://i.imgur.com/aXUCaO5.jpg",
  "http://i.imgur.com/PjPFLL3.jpg",
  "http://i.imgur.com/votLJKA.jpg",
  "http://i.imgur.com/Gc1ltoW.jpg"
]

def add_photo(post)
  post.content_type = "Photo"
  Photo.create({
    post_id: post.id,
    url: @photo_urls.sample,
    caption: Faker::Company.bs,
    link: 'http://www.google.com'
  })
end

def add_text(post)
  post.content_type = "Text"
  Text.create({
    post_id: post.id,
    text: Faker::Lorem.paragraph(8),
    title: Faker::Company.bs
  })
end

def get_post_date
  Random.rand(24).hours.ago
end
#build avatar list
require 'open-uri'

doc = Nokogiri::HTML(open("http://www.picgifs.com/avatars/fruit/?s=added&i=100"))
imgs = doc.css('img').map { |img| img['src']}
imgs.each do |i|
  if i.include?('http') && i.include?('jpg')
    Avatar.create({url: i})
  end
end

blog_posts = []


# doc = Nokogiri::HTML(open(  'http://thebaxterbuilding.tumblr.com/'))
# posts = doc.css('div.post').map{ |e| e.inner_html.gsub("\t",'').gsub("\n",'') }
# user = User.create({
#   username: "BerrysComics",
#   password: 'password',
#   email: "fake1@fake.com",
#   avatar: "http://25.media.tumblr.com/avatar_4ed5fb2488e9_48.png"
# })
# posts.each do |posttext|
#
#   post = Post.create({
#     post_date: get_post_date,
#     user_id: user.id,
#     content_type: "Text"
#   })
#   Text.create({
#     post_id: post.id,
#     text: posttext
#   })
#   post.save
# end

doc = Nokogiri::HTML(open(  'http://murrayscheese.tumblr.com/'))
posts = doc.css('li.post').map{ |e| e.inner_html.gsub("\t",'').gsub("\n",'') }
user = User.create({
  username: "MurraysCheese",
  password: 'password',
  email: "fake4@fake.com",
  avatar: "http://us.123rf.com/400wm/400/400/mediagram/mediagram1207/mediagram120700051/14539036-assortment-of-small-dutch-cheese-on-a-market.jpg"
})
posts.each do |posttext|

  post = Post.create({
    post_date: get_post_date,
    user_id: user.id,
    content_type: "Text"
  })
  Text.create({
    post_id: post.id,
    text: posttext
  })
  post.save
end


doc = Nokogiri::HTML(open(  'http://aspensnowmass.tumblr.com/'))
posts = doc.css('article.post').map{ |e| e.inner_html.gsub("\t",'').gsub("\n",'') }
user = User.create({
  username: "Aspen",
  password: 'password',
  email: "fake3@fake.com",
  avatar: "http://static.tumblr.com/dd6c06c56736970a92aff57fe89bfc5b/9qglsht/uCzmmjllh/tumblr_static_profile-picture.jpg"
})
posts.each do |posttext|

  post = Post.create({
    post_date: get_post_date,
    user_id: user.id,
    content_type: "Text"
  })
  Text.create({
    post_id: post.id,
    text: posttext
  })
  post.save
end


doc = Nokogiri::HTML(open( "http://rachelzoe.tumblr.com/"))
posts = doc.css('div.box').map{ |e| e.inner_html.gsub("\t",'').gsub("\n",'') }
user = User.create({
  username: "Rachelzoe",
  password: 'password',
  email: "fake2@fake.com",
  avatar:'http://31.media.tumblr.com/avatar_3f09db7c9d20_128.png'
})
posts.each do |posttext|

  post = Post.create({
    post_date: get_post_date,
    user_id: user.id,
    content_type: "Text"
  })
  Text.create({
    post_id: post.id,
    text: posttext
  })
  post.save
end
# blog_posts << posts
#
# blog
#
# 4.times do |i|
# user = User.create({
#   username: Faker::Name.first_name,
#   password: 'password',
#   email: "fake#{i}@fake.com"
# })
# doc = Nokogiri::HTML(open(  'http://dailydcu.com/'))
# posts = doc.css('div.single_wrapper div.post').map{ |e| e.inner_html.gsub("\t",'').gsub("\n",'') }
# posts.each do |posttext|
#
#   post = Post.create({
#     post_date: DateTime.now.to_date,
#     user_id: user.id,
#     content_type: "Text"
#   })
#   Text.create({
#     post_id: post.id,
#     text: posttext
#   })
#   post.save
# end



#
# # get images
#
# subs = ['earthporn', 'gentlemanboners','aww','futureporn']
#
# subs.each do |sub|
#   doc = Nokogiri::HTML(open("http://www.reddit.com/r/#{sub}"))
#   links = doc.css('a.title').map { |link| link['href']}
  @photo_urls.each do |link|
    if link.include?('imgur')
      codeurl = link.split('/')
      code = codeurl.last.split('.').first
      Background.create({url: link})
    end
  end
# end

