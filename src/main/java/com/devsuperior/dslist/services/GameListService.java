package com.devsuperior.dslist.services;

import com.devsuperior.dslist.dto.GameListDTO;
import com.devsuperior.dslist.repositories.GameListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class GameListService {

    @Autowired
    private GameListRepository gameRepository;

    @Transactional(readOnly = true)
    public List<GameListDTO> findAll() {
        return gameRepository.findAll().stream().map(x -> new GameListDTO(x)).toList();
    }
}
