package com.navigationData;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author Vinayak Agrawal
 */
@ServerEndpoint("/navdata")
public class navigationData {
    JSONArray nav = new JSONArray();
    JSONObject cat = new JSONObject();
    
    @OnOpen
    public void open (Session session) throws JSONException, EncodeException {
        System.out.println("Connection is live");
        
        try {
            /* creating the json for the navigation data */
            JSONArray subCatAr = new JSONArray();
            JSONObject subCat = new JSONObject();
            JSONArray subsubCatAr = new JSONArray();
            JSONObject subsubCat = new JSONObject();
            
            cat.put("category", "Electronics");
            
            /* sub category for electronics start */
            subCat = new JSONObject();
            subCat.put("sub", "Washing Machines");
            subCatAr.put(subCat);
            
            subCat = new JSONObject();
            subCat.put("sub", "Televisions");
            /* subcategory for televisions added */
            subsubCat.put("sub", "Sony");
            subsubCat.put("link", "./electronics/televisions/sony.html");
            subsubCatAr.put(subsubCat);
            subsubCat = new JSONObject();
            subsubCat.put("sub", "Samsung");
            subsubCat.put("link", "./electronics/televisions/samsung.html");
            subsubCatAr.put(subsubCat);
            subsubCat = new JSONObject();
            subsubCat.put("sub", "LG");
            subsubCat.put("link", "./electronics/televisions/lg.html");
            subsubCatAr.put(subsubCat);
            subsubCat = new JSONObject();
            subsubCat.put("sub", "Hisene");
            subsubCat.put("link", "./electronics/televisions/hisene.html");
            subsubCatAr.put(subsubCat);
            /* subcategory for television end */
            subCat.put("subcategory", subsubCatAr);
            subCatAr.put(subCat);
            
            subCat = new JSONObject();
            subCat.put("sub", "Refrigerators");
            subCatAr.put(subCat);
            
            subCat = new JSONObject();
            subCat.put("sub", "Air Conditioners");
            subCatAr.put(subCat);
            
            subCat = new JSONObject();
            subCat.put("sub", "Small home Appliances");
            subCatAr.put(subCat);
            
            subCat = new JSONObject();
            subCat.put("sub", "Health Care Appliances");
            subCatAr.put(subCat);
            
            cat.put("subcategory", subCatAr);
            nav.put(cat);
            /* sub category for electronics end */
            
            cat = new JSONObject();
            cat.put("category", "Appliances");
            subCat = new JSONObject();
            subCatAr = new JSONArray();
            nav.put(cat);
            
            cat = new JSONObject();
            cat.put("category", "Baby & Kids");
            subCat = new JSONObject();
            subCatAr = new JSONArray();
            nav.put(cat);
            
            cat = new JSONObject();
            cat.put("category", "Home & Furniture");
            subCat = new JSONObject();
            subCatAr = new JSONArray();
            nav.put(cat);
            
            cat = new JSONObject();
            cat.put("category", "Books");
            subCat = new JSONObject();
            subCatAr = new JSONArray();
            nav.put(cat);
            
            cat = new JSONObject();
            cat.put("category", "Gaming & Accessories");
            subCat = new JSONObject();
            subCatAr = new JSONArray();
            nav.put(cat);
        
            session.getBasicRemote().sendObject(nav);
        } catch (IOException ex) {
            Logger.getLogger(navigationData.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    @OnClose
    public void close () {
        System.out.println("Connection closed");
    }
    
    /**
     *
     * @param error
     */
    @OnError
    public void error (Throwable error) {
        System.out.println("Error connection: " + error);
    }
    
    @OnMessage
    public void msg (String message, Session session) {
    }
}
