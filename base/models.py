from django.db import models
from froala_editor.fields import FroalaField
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

STATUS = ((0, 'Draft'), (1, 'Published'))

class Contact(models.Model):
    name = models.CharField(max_length=80)
    email = models.EmailField()
    body = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_on']

    def __str__(self):
        return self.name


class FirstTimer(models.Model):
    name = models.CharField(max_length=80)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_on']

    def __str__(self):
        return self.name

#models for blog
class Post(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=250, unique=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    content = FroalaField()
    posted_on = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='media/images')
    status = models.IntegerField(choices=STATUS, default=0)

    class Meta:
        ordering = ['-posted_on']

    def __str__(self):
        return self.title
    
    def snipet(self):
        return self.content[: 150] + '...'
    

class Comment(models.Model):
    post = models.ForeignKey(Post,on_delete=models.CASCADE,related_name='comments')
    name = models.CharField(max_length=80)
    email = models.EmailField()
    body = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)

    class Meta:
        ordering = ['created_on']

    def __str__(self):
        return 'Comment {} by {}'.format(self.body, self.name)


class Event(models.Model):
    name = models.CharField(max_length=200)
    event_date = models.DateTimeField()

    def __str__(self):
        return self.name
    