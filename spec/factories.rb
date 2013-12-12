photo_urls = [
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

FactoryGirl.define do

  sequence :email do |n|
    "fake#{n}@fake.com"
  end

  sequence :username do |n|
    "user#{n}"
  end

  sequence :url do |n|
    photo_urls[n]
  end

  factory :user do
    email
    username
    password "password"
  end

  factory :post do
    post_date DateTime.now.to_date
    user_id nil
    content_type 'none'
  end

  factory :text do
    post_id nil
    text Faker::Lorem.paragraph(8)
    title Faker::Company.bs
  end

  factory :photo do
    post_id nil
    url
    caption Faker::Company.bs
    link 'http://www.google.com'
  end

end

