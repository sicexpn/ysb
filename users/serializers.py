from rest_framework import serializers
from users.models import User 

class UserSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    phone = serializers.CharField(max_length=48)
    email = serializers.EmailField()
    address = serializers.CharField()
    password = serializers.CharField(max_length=200)	
    #date = serializers.DateTimeField()	
    class Meta:
        model = User 
        fields = ('name', 'password', 'email', 'phone', 'address')

    def create(self, validated_data):
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        # Update existing instance
        instance.name= validated_data.get('name', instance.name)
        instance.phone= validated_data.get('phone', instance.phone)
        instance.password= validated_data.get('password', instance.password)
        instance.address= validated_data.get('address', instance.address)
        instance.email= validated_data.get('email', instance.email)
        instance.save()
        return instance

