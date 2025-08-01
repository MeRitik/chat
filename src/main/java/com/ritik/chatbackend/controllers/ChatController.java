package com.ritik.chatbackend.controllers;

import com.ritik.chatbackend.dtos.MessageDto;
import com.ritik.chatbackend.entities.AppUser;
import com.ritik.chatbackend.entities.Group;
import com.ritik.chatbackend.entities.Message;
import com.ritik.chatbackend.repositories.MessageRepository;
import com.ritik.chatbackend.services.AppUserService;
import com.ritik.chatbackend.services.GroupService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller  // Not @RestController
@AllArgsConstructor
public class ChatController {

    private final GroupService groupService;
    private final AppUserService appUserServices;
    private final MessageRepository messageRepository;
    private final ModelMapper modelMapper;

    @MessageMapping("/sendMessage/{groupname}") // Maps to /app/sendMessage/{groupname}
    @SendTo("/topic/group/{groupname}")        // Clients subscribe to /topic/group/{groupname}
    public MessageDto sendMessage(
            @DestinationVariable String groupname,
            @Payload MessageDto message) {

        Group group = groupService.getGroupByName(groupname);
        AppUser sender = appUserServices.findByUsername(message.getSender().getUsername());

        Message msg = new Message();
        msg.setMessage(message.getMessage());
        msg.setGroup(group);
        msg.setSender(sender);

        messageRepository.save(msg);
        group.getMessages().add(msg);

        return modelMapper.map(msg, MessageDto.class);
    }
}
