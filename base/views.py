from django.db.models.query import Q
from django.shortcuts import render, get_object_or_404, redirect
from .forms import ContactForm, FirstTimerForm, CommentForm
from django.views import generic
from .models import Post

# Create your views here.
def home(request):
    contact_form = ContactForm()
    if request.method == 'POST':
        contact_form = ContactForm(request.POST)
        if contact_form.is_valid():
            contact_form.save()
    return render(request, 'base/home.html', {'contact_form': contact_form})

def about(request):
    return render(request, 'base/about.html')

def pastors(request):
    return render(request, 'base/pastors.html')

class BlogView(generic.ListView):
    model = Post
    queryset = Post.objects.filter(status=1).order_by('-posted_on')
    template_name = 'base/blog.html'
    context_object_name = 'blog_view'
    paginate_by = 30

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

class BlogDetailView(generic.ListView):
    model = Post
    template_name = 'base/blog_detail.html'
    context_object_name = 'blog_detail'

    def get_object(self):
        slug = self.kwargs.get('slug')
        return get_object_or_404(Post, slug=slug)
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        post = self.object
        comments = post.comments.filter(active=True)
        comment_form = CommentForm()
        recent_posts = Post.objects.all().order_by('-posted_on')[:5]
        context['comments'] = comments
        context['comment_form'] = comment_form
        context['recent_posts'] = recent_posts
        return context
    

def add_comment(request, slug):
    post = get_object_or_404(Post, slug=slug)
    comment_form = CommentForm()
    if request.method == 'POST':
        comment_form = CommentForm(data=request.POST)
        if comment_form.is_valid():
            new_comment = comment_form.save(commit=False)
            new_comment.post = post
            new_comment.save()
            return redirect('post_detail', slug=post.slug)
    return render(request, 'base/blog_detail.html', {'post': post, 'comment_form': comment_form})