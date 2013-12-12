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
  post.content_type = "Text"
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

#build avatar list
doc = Nokogiri::HTML(open("http://www.picgifs.com/avatars/fruit/?s=added&i=100"))
imgs = doc.css('img').map { |img| img['src']}
imgs.each do |i|
  puts i
  if i.include?('http') && i.include?('jpg')
    Avatar.create({url: i})
  end
end

4.times do |i|
user = User.create({
  username: "user#{i+1}",
  password: 'password',
  email: "fake#{i}@fake.com"
})

  (44 + Random.rand(12)).times do
    post = Post.create({
      post_date: DateTime.now.to_date,
      user_id: user.id
    })


    Random.rand(2) == 0 ? add_photo(post) : add_text(post)

    post.save
  end
end



#
# # get images
# require 'open-uri'
# subs = ['earthporn', 'gentlemanboners','aww','futureporn']
#
# subs.each do |sub|
#   doc = Nokogiri::HTML(open("http://www.reddit.com/r/#{sub}"))
#   links = doc.css('a.title').map { |link| link['href']}
#   @photo_urls.each do |link|
#     if link.include?('imgur')
#       codeurl = link.split('/')
#       code = codeurl.last.split('.').first
#       Background.create({url: code})
#     end
#   end
# end

