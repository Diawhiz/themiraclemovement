from django.db.models.query import Q
from django.shortcuts import render, get_object_or_404, redirect
from .forms import ContactForm, FirstTimerForm, CommentForm
from django.views import generic
from .models import Post, Event
from django.http import HttpResponse

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

# def live(request):
#     return render(request, 'base/live.html')

class BlogView(generic.ListView):
    model = Post
    queryset = Post.objects.filter(status=1).order_by('-posted_on')
    template_name = 'base/blog.html'
    context_object_name = 'blog'
    paginate_by = 30

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

class BlogDetailView(generic.DetailView):
    model = Post
    template_name = 'base/blog_detail.html'
    context_object_name = 'blog_detail'
    
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
        comment_form = CommentForm(data=request.POST or None, initial={'post': post})
        if comment_form.is_valid():
            new_comment = comment_form.save(commit=False)
            new_comment.post = post
            new_comment.save()
            return redirect('blog_detail', slug=post.slug)
    return render(request, 'base/blog_detail.html', {'post': post, 'comment_form': comment_form})


def LiveView(request):
    event = Event.objects.first()
    if not event:
        # handle case when no events exist
        return HttpResponse("No events found")
    
    event_datetime = event.event_date.strftime('%Y-%m-%dT%H:%M:%S')
    event_name = event.name

    #print statements for debugging
    print(f"Event DateTime: {event_datetime}")
    print(f"Event Name: {event_name}")

    context = {'event_datetime': event_datetime, 'event_name': event_name}
    return render(request, 'base/live.html', context)