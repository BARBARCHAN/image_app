class PostsController < ApplicationController

  before_action :set_post, only: [:edit, :update, :destroy]

  def index
    @posts = Post.all.order("created_at DESC")
  end

  def new
    @post = Post.new
    @post.images.build

    # 3.times do
    #   @post.images.build
    # end
  end

  def create
    @post = Post.new(post_params)
    if @post.valid?
       @post.save
       redirect_index
    else
      # これが無いとバリデーションエラーに引っかかった時にfile_fieldが表示されなくなります
      @post.images.build  
      render :new
    end
  end

  def edit
    # binding.pry
    @post.images.build
  end

  def update
    binding.pry
    @post.update(post_params)
    redirect_index
  end

  def destroy
    @post.destroy
    redirect_index
  end

  private

  def post_params
    params.require(:post).permit(:text, images_attributes: [:src, :id, :_destroy])
  end

  def set_post
    @post = Post.find(params[:id])
  end

  def redirect_index
    redirect_to root_path
  end

end
