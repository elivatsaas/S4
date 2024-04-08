{
    "targets":[
        {
        "target_name": "schedule-generator",
            "type": "executable",
         "cflags!": [ "-Wall", "-std=c++11"],
        "sources": [
        "cppsrc/scheduleGenerator.cpp",
        "cppsrc/cppAPI.cpp",
        "cppsrc/timeConverter.cpp"
                ],
                'linkflags': [
                    "-lcurl",
                "ljson"
          ],
          'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
        'include_dirs': [
    '-I/usr/local/Cellar/jsoncpp/1.9.5/include',
    "<!@(node -p \"require('node-addon-api').include\")",
    "-I/Users/elivatsaas/curl/include"
    "-I/Users/elivatsaas/S4/server/src/cppsrc/include"
    ],
    
        "libraries": [ 
            "-L/usr/local/Cellar/jsoncpp/1.9.5/lib -ljsoncpp",
            "-L/Users/elivatsaas/curl/lib -lcurl"
            
             ],
    'link_settings': {
            'library_dirs': [
                '/Users/elivatsaas/vcpkg/packages/jsoncpp_x64-osx/lib', 
                "/Users/elivatsaas/curl/lib"
            ]
        },
        "conditions": [ 
        [ 'OS=="mac"', { 
            "xcode_settings": { 
                'OTHER_CPLUSPLUSFLAGS' : ['-std=c++11','-stdlib=libc++'], 
                'OTHER_LDFLAGS': ['-stdlib=libc++'], 
                'MACOSX_DEPLOYMENT_TARGET': '10.7' } 
            }
        ] 
      ] 
        }

    ]
}
