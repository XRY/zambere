/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.xrystalgenius.quartz;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;

import org.apache.cordova.*;

public class Quartz extends DroidGap
{
	private final ExecutorService threadPool = Executors.newCachedThreadPool();
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        
        try
        {
            //String pName = this.getClass().getPackage().getName();
            //this.copy("quartz.db","/data/data/"+pName+"/databases/");
        	File CheckDirectory;
        	CheckDirectory = new File("quartz.db","/mnt/sdcard/Quartz/");
        	if (!CheckDirectory.exists())
        	{ 
        		this.copy("quartz.db","/mnt/sdcard/Quartz/");
        	}

        	
        	
        }
        catch (IOException e)
        {
        	e.printStackTrace();
        }
        
        
        
        
        //super.loadUrl("file:///android_asset/www/index.html");
        super.setIntegerProperty("splashscreen", R.drawable.splash);
        super.loadUrl("file:///android_asset/www/home.html",3500);

    }
   
    

@Override
public boolean onCreateOptionsMenu(Menu menu) {
    getMenuInflater().inflate(R.menu.firstmenu, menu);
    return true;
}

@Override
public boolean onOptionsItemSelected(MenuItem item) {
    // Handle item selection
    switch (item.getItemId()) {
    case R.id.exit:
        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.addCategory(Intent.CATEGORY_HOME);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
        return true;
    default:
        return super.onOptionsItemSelected(item);
    }
}

@Override
public void onDestroy(){
android.os.Process.killProcess(android.os.Process.myPid());
super.onDestroy();
}




void copy(String file, String folder) throws IOException {
	File CheckDirectory;
	CheckDirectory = new File(folder);
	if (!CheckDirectory.exists())
	{ 
		CheckDirectory.mkdir();
	}

	InputStream in = getApplicationContext().getAssets().open(file);
	OutputStream out = new FileOutputStream(folder+file);

	// Transfer bytes from in to out
	byte[] buf = new byte[1024];
	int len; while ((len = in.read(buf)) > 0) out.write(buf, 0, len);
	in.close(); out.close();

}

}

