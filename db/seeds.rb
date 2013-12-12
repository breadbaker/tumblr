# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'open-uri'
subs = ['earthporn', 'gentlemanboners','aww','futureporn']

subs.each do |sub|
  doc = Nokogiri::HTML(open("http://www.reddit.com/r/#{sub}"))
  links = doc.css('a.title').map { |link| link['href']}
  links.each do |link|
    if link.include?('imgur')
      codeurl = link.split('/')
      code = codeurl.last.split('.').first
      Background.create({url: code})
    end
  end
end