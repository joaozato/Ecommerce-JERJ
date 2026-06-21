package com.commerce.ecommercerj.dto;

import org.springframework.context.ApplicationEvent;

public class VendaRealizadaEvent extends ApplicationEvent {
    public VendaRealizadaEvent(Object source) {
        super(source);
    }
}
