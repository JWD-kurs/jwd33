package jwd.wafepa.service;

import java.util.List;

import jwd.wafepa.model.Activity;

public interface ActivityService {
	List<Activity> findAll();
	Activity findOne(Long id);
	Activity save(Activity activity);
	Activity delete(Long id);
}
