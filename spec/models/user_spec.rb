require 'spec_helper.rb'
feature User do

  it 'can create a user' do
    user = FactoryGirl.create(:user)


    expect(user).to be_valid

    expect(user.id).not_to eq(nil)
  end

  it 'validates password length' do
    expect do
      FactoryGirl.create(:user, {password: '12345'})
    end.to raise_error(RuntimeError)
  end

  it 'validates username' do
    expect do
      FactoryGirl.create(:user, {username: nil})
    end.to raise_error()
  end

  it 'validates email' do
    expect do
      FactoryGirl.create(:user, {email: nil})
    end.to raise_error()
    expect do
      FactoryGirl.create(:user, {email: 'ouonil'})
    end.to raise_error()
  end
end