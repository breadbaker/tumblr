require 'spec_helper'

describe Post do
  let(:user) { FactoryGirl.create(:user)}
  it 'can create a post' do
    post = FactoryGirl.create(:post, { user_id: user.id})
    expect(post.id).not_to eq(nil)
  end
end