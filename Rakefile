# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

desc 'Production compile client assets'
task 'assets:compile_client' do
  Dir.chdir(Rails.root.join('client')) do
    system('yarn install && yarn build')
  end
end

Rails.application.load_tasks

# Automatically run client production compilation when assets are precompiled
Rake::Task['assets:precompile'].enhance ['assets:compile_client']
