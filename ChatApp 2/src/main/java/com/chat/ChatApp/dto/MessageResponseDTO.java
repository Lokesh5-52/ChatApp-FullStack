package com.chat.ChatApp.dto;

public class MessageResponseDTO {

    private Long id;
    private String content;
    private String timestamp;
    private UserResponseDTO sender;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public UserResponseDTO getSender() {
        return sender;
    }

    public void setSender(UserResponseDTO sender) {
        this.sender = sender;
    }
}
