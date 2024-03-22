#include <node.h>
#include <iostream>

    using v8::Context;
    using v8::FunctionCallbackInfo;
    using v8::Isolate;
    using v8::Local;
    using v8::Object;
    using v8::Number;
    using v8::String;
     using v8::Exception;
    using v8::Value;


void testC(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
    Local<Context> context = isolate->GetCurrentContext();

 Local<Object> shifts = Object::New(isolate);
  shifts->Set(context,
           String::NewFromUtf8(isolate,
                               "msg").ToLocalChecked(),
                               args[0]->ToString(context).ToLocalChecked())
           .FromJust();

 Local<Object> eligibleEmployees = Object::New(isolate);
  eligibleEmployees->Set(context,
           String::NewFromUtf8(isolate,
                               "msg").ToLocalChecked(),
                               args[1]->ToString(context).ToLocalChecked())
           .FromJust();

 std::cout << "Doing stuff with schedule\nReturning objects\n" ; 
  args.GetReturnValue().Set(shifts);
}


void Initialize(v8::Local<v8::Object> exports) {
    NODE_SET_METHOD(exports, "test", testC);
}

NODE_MODULE(test, Initialize)