require 'spec_helper'

describe Text do
  let(:user) { FactoryGirl.create(:user)}



  it 'can create a text post' do
    post = FactoryGirl.create(:post, { user_id: user.id})
    text = FactoryGirl.create(:text, {post_id: post.id})
    expect(text.id).not_to eq(nil)
  end
end