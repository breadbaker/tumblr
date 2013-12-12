require 'spec_helper.rb'
feature "Text Posts" do
  let(:user) do
    user = FactoryGirl.create(:user)
    page.set_rack_session(token: user.token)
    user
  end

  it 'can create a text post' do

    text = FactoryGirl.build(:text)

    user = FactoryGirl.build(:user)
    post_data =  {
        text: Faker::Lorem.paragraph(8),
        title: Faker::Company.bs,
        post: {
          post_date: DateTime.now.to_date
        }
      }
    post "/texts", text: post_data



    expect(response.status).to eq(200)

    expect(Text.last.text).to eq(post_data[:text])
  end


end