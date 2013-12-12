require 'spec_helper'

describe Photo do
  let(:user) { FactoryGirl.create(:user)}
  it 'can create a photo post' do
    post = FactoryGirl.create(:post, { user_id: user.id})
    photo = FactoryGirl.create(:photo, {post_id: post.id})
    expect(photo.id).not_to eq(nil)
  end
end