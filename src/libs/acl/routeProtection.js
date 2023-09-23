import ability from './ability'

// export const canNavigate = to => to.matched.some(route => 
//     ability.can(route.meta.action || 'read', route.meta.resource)
//     )

export const canNavigate = to => {
        // const result = to.matched.some(route => 
        //   ability.can(route.meta.action || 'read', route.meta.resource)
        // );
        // console.log('ability ', ability)
        // console.log('to to ', to)
        // console.log('canNavigate result:', result); // Log the variable 'result'
        
        return true;
      };
      

export const _ = undefined
