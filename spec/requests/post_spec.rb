require 'spec_helper.rb'
feature "Text Posts" do
  let(:user) do
    user = FactoryGirl.create(:user)
    user
  end

  let(:text) do
    post = FactoryGirl.create(:post, { user_id: user.id})
    text = FactoryGirl.create(:text, {post_id: post.id})
    text
  end

  it 'can view posts' do
    url = "/posts?token=#{user.token}"

    get url

    # expect(response.status).to eq(200)
#     expect(1).to eq(response.posts)
  end
end
