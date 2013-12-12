require 'spec_helper.rb'
feature "Text Posts" do
  let(:user) do
    user = FactoryGirl.create(:user)
    page.set_rack_session(token: user.token)
    user
  end

  it 'can create a text post' do

    post_data =  {
        content: {
          text: Faker::Lorem.paragraph(8),
          title: Faker::Company.bs
        },
        post: {
          content_type: 'Text',
          post_date: DateTime.now.to_date
        },
        token: user.token
      }
    post "/posts", post_data

    expect(response.status).to eq(200)
    expect(Text.last.text).to eq(post_data[:content][:text])
  end

  it 'validates text post text' do

    post_data =  {
        content: {
          text: nil,
          title: Faker::Company.bs
        },
        post: {
          content_type: 'Text',
          post_date: DateTime.now.to_date
        },
        token: user.token
      }
    post "/posts", post_data

    expect(response.status).to eq(400)
    expect(Text.last).to eq(nil)
  end

  it 'validates text post title' do

    post_data =  {
        content: {
          text: Faker::Lorem.paragraph(8),
          title: nil,
        },
        post: {
          content_type: 'Text',
          post_date: DateTime.now.to_date
        },
        token: user.token
      }
    post "/posts", post_data

    expect(response.status).to eq(400)
    expect(Text.last).to eq(nil)
  end


end