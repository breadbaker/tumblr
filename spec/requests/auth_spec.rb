require 'spec_helper.rb'
feature "User Authentication" do

  it 'can create a user' do
    user = FactoryGirl.build(:user)
    post "/users", user: {
      username: user.username,
      password: "password",
      email: user.email
    }
    puts "User token#{user.token}"


    expect(response.status).to eq(200)
  end

  it 'can sign in a user' do
    user = FactoryGirl.create(:user)
    page.set_rack_session(token: user.token)
    post "/sessions", user: {
      email: user.email,
      password: "password"
    }

    expect(response.status).to eq(200)
  end

  it 'checks for correct user name' do
    post "/sessions", user: { username: 'user', password: "incorrect"}

    expect(response.status).to eq(400)
  end

end